from pathlib import Path
import re, html
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether

ROOT=Path(__file__).resolve().parents[1]
FONT=ROOT/'report/fonts'
REG=FONT/'NanumGothic-Regular.ttf'; BOLD=FONT/'NanumGothic-Bold.ttf'
pdfmetrics.registerFont(TTFont('Nanum',str(REG)))
pdfmetrics.registerFont(TTFont('Nanum-Bold',str(BOLD)))
pdfmetrics.registerFontFamily('Nanum',normal='Nanum',bold='Nanum-Bold',italic='Nanum',boldItalic='Nanum-Bold')

INK=colors.HexColor('#152238'); BLUE=colors.HexColor('#173B63'); TEAL=colors.HexColor('#1A817A'); PALE=colors.HexColor('#EAF1F7'); GRID=colors.HexColor('#D6E0E8')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleKR',fontName='Nanum-Bold',fontSize=23,leading=30,textColor=BLUE,spaceAfter=9,wordWrap='CJK'))
styles.add(ParagraphStyle(name='H2KR',fontName='Nanum-Bold',fontSize=15,leading=21,textColor=BLUE,spaceBefore=11,spaceAfter=6,keepWithNext=True,wordWrap='CJK'))
styles.add(ParagraphStyle(name='H3KR',fontName='Nanum-Bold',fontSize=11.5,leading=16,textColor=TEAL,spaceBefore=8,spaceAfter=4,keepWithNext=True,wordWrap='CJK'))
styles.add(ParagraphStyle(name='BodyKR',fontName='Nanum',fontSize=9.2,leading=14,textColor=INK,spaceAfter=6,wordWrap='CJK'))
styles.add(ParagraphStyle(name='BulletKR',parent=styles['BodyKR'],leftIndent=12,firstLineIndent=-8,bulletIndent=0,spaceAfter=4))
styles.add(ParagraphStyle(name='SmallKR',fontName='Nanum',fontSize=7.1,leading=10,textColor=INK,wordWrap='CJK'))
styles.add(ParagraphStyle(name='TableHeadKR',fontName='Nanum-Bold',fontSize=7.2,leading=10,textColor=colors.white,alignment=TA_LEFT,wordWrap='CJK'))
styles.add(ParagraphStyle(name='TableKR',fontName='Nanum',fontSize=6.5,leading=8.4,textColor=INK,wordWrap='CJK'))
styles.add(ParagraphStyle(name='QuoteKR',fontName='Nanum-Bold',fontSize=9.2,leading=14,textColor=BLUE,leftIndent=10,rightIndent=8,spaceBefore=3,spaceAfter=8,wordWrap='CJK'))
styles.add(ParagraphStyle(name='KickerKR',fontName='Nanum-Bold',fontSize=8,leading=11,textColor=TEAL,spaceAfter=7,wordWrap='CJK'))
styles.add(ParagraphStyle(name='CoverTitleKR',fontName='Nanum-Bold',fontSize=27,leading=36,textColor=BLUE,spaceAfter=10,wordWrap='CJK'))
styles.add(ParagraphStyle(name='CoverSubKR',fontName='Nanum',fontSize=11,leading=17,textColor=INK,spaceAfter=8,wordWrap='CJK'))
styles.add(ParagraphStyle(name='CoverLabelKR',fontName='Nanum-Bold',fontSize=8,leading=11,textColor=TEAL,wordWrap='CJK'))
styles.add(ParagraphStyle(name='CoverValueKR',fontName='Nanum-Bold',fontSize=12,leading=17,textColor=BLUE,wordWrap='CJK'))


def inline(s):
    s=s.strip()
    s=s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    def render_link(match):
        label, target=match.group(1),match.group(2)
        return f'<link href="{target}" color="#1A817A">{label}</link>' if target.startswith('https://') else label
    s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',render_link,s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'`([^`]+)`',r'<font name="Nanum-Bold">\1</font>',s)
    s=s.replace('—','-').replace('–','-').replace('−','-')
    return s

def table_data(lines):
    rows=[]
    for ln in lines:
        cells=[x.strip() for x in ln.strip().strip('|').split('|')]
        if all(re.fullmatch(r':?-{3,}:?',c.replace(' ','')) for c in cells): continue
        rows.append(cells)
    n=max(map(len,rows))
    rows=[r+['']*(n-len(r)) for r in rows]
    weights=[]
    for j in range(n):
        mx=max([len(re.sub(r'\[[^]]+\]\([^)]+\)','',r[j])) for r in rows] or [5])
        weights.append(max(1,min(mx,36)))
    total=sum(weights)
    widths=[(doc_width* (w/total)) for w in weights]
    data=[]
    for ri,row in enumerate(rows):
        data.append([Paragraph(inline(x),styles['TableHeadKR'] if ri==0 else styles['TableKR']) for x in row])
    t=Table(data,colWidths=widths,repeatRows=1,hAlign='LEFT',splitByRow=1)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),BLUE),('TEXTCOLOR',(0,0),(-1,0),colors.white),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PALE]),('GRID',(0,0),(-1,-1),0.35,GRID),
        ('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),
        ('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4),
    ]))
    return t

def build_doc(out, md_files, project, cutoff):
    global doc_width
    doc=SimpleDocTemplate(str(out),pagesize=A4,rightMargin=17*mm,leftMargin=17*mm,topMargin=18*mm,bottomMargin=17*mm,title=f'{project} Equity Research',author='Equity Research Portfolio')
    doc_width=A4[0]-34*mm
    story=[Spacer(1,20*mm),Paragraph('EQUITY RESEARCH  /  VALUATION NOTE',styles['KickerKR']),
           Paragraph('SK hynix<br/>기업가치 분석',styles['CoverTitleKR']),
           Paragraph(f'HBM 세대 전환과 메모리 사이클을 분리해 본 밸류에이션<br/>기준일 {cutoff} | KRW 기준',styles['CoverSubKR']),
           Spacer(1,10*mm)]
    thesis=Table([[Paragraph('<b>핵심 판단</b><br/><br/>SOTP 중심값은 주가 위에 있지만, DCF와 RIM은 현금 투자 부담과 ROE 정상화에 민감합니다. HBM4 수율·고객 인증·현금전환이 확인될 때 SOTP의 신뢰도를 높일 수 있습니다.',styles['QuoteKR'])]],colWidths=[doc_width])
    thesis.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('BOX',(0,0),(-1,-1),0.7,GRID),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),11),('BOTTOMPADDING',(0,0),(-1,-1),9)]))
    story += [thesis,Spacer(1,10*mm)]
    rows=[
        [Paragraph('VALUATION',styles['TableHeadKR']),Paragraph('BASE VALUE',styles['TableHeadKR']),Paragraph('ROLE',styles['TableHeadKR'])],
        [Paragraph('SOTP',styles['TableKR']),Paragraph('2,139,000원/주',styles['CoverValueKR']),Paragraph('중심 가치',styles['TableKR'])],
        [Paragraph('DCF',styles['TableKR']),Paragraph('1,679,000원/주',styles['CoverValueKR']),Paragraph('현금흐름 교차검증',styles['TableKR'])],
        [Paragraph('Cycle PER',styles['TableKR']),Paragraph('1,829,000원/주',styles['CoverValueKR']),Paragraph('Micron 8x anchor 민감도',styles['TableKR'])],
        [Paragraph('RIM',styles['TableKR']),Paragraph('862,520원/주',styles['CoverValueKR']),Paragraph('초과이익 하방 점검',styles['TableKR'])],
        [Paragraph('기준 주가',styles['TableKR']),Paragraph('1,723,000원',styles['CoverValueKR']),Paragraph('2026-10-07 종가',styles['TableKR'])],
    ]
    summary=Table(rows,colWidths=[doc_width*.23,doc_width*.33,doc_width*.44],repeatRows=1,hAlign='LEFT')
    summary.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),BLUE),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PALE]),('GRID',(0,0),(-1,-1),0.4,GRID),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
    story += [summary,Spacer(1,9*mm),Paragraph('분석 순서',styles['H3KR']),Paragraph('HBM 세대별 상업화 → 제품군별 SOTP → DCF·RIM·cycle PER 교차검증',styles['CoverSubKR']),Spacer(1,7*mm),Paragraph('교육·포트폴리오 목적의 기업 분석입니다. 모든 전망과 가치 산출은 입력 가정에 민감하며 투자 권유가 아닙니다.',styles['SmallKR']),PageBreak()]
    for fi,file in enumerate(md_files):
        if fi: story.append(PageBreak())
        text=file.read_text(encoding='utf-8')
        lines=text.splitlines(); i=0; first_h1=True
        while i<len(lines):
            line=lines[i].rstrip()
            if not line.strip() or line.strip()=='---': i+=1; continue
            if line.lstrip().startswith('|'):
                tab=[]
                while i<len(lines) and lines[i].lstrip().startswith('|'):
                    tab.append(lines[i]); i+=1
                story += [Spacer(1,3),table_data(tab),Spacer(1,6)]; continue
            if line.startswith('# '):
                story.append(Paragraph(inline(line[2:]),styles['TitleKR'] if fi==0 else styles['H2KR'])); first_h1=False; i+=1; continue
            if line.startswith('## '): story.append(Paragraph(inline(line[3:]),styles['H2KR'])); i+=1; continue
            if line.startswith('### '): story.append(Paragraph(inline(line[4:]),styles['H3KR'])); i+=1; continue
            if line.startswith('>'):
                story.append(Paragraph(inline(line.lstrip('> ')),styles['QuoteKR'])); i+=1; continue
            if re.match(r'^\s*[-*] ',line):
                story.append(Paragraph('• '+inline(re.sub(r'^\s*[-*] ','',line)),styles['BulletKR'])); i+=1; continue
            if re.match(r'^\s*\d+\. ',line):
                story.append(Paragraph(inline(line.strip()),styles['BulletKR'])); i+=1; continue
            if line.startswith('```'):
                i+=1
                while i<len(lines) and not lines[i].startswith('```'): i+=1
                i+=1; continue
            # Join wrapped markdown lines until a block starts.
            parts=[line.strip()]; i+=1
            while i<len(lines) and lines[i].strip() and not lines[i].startswith(('#','>','|','```')) and not re.match(r'^\s*[-*] |^\s*\d+\. ',lines[i]):
                parts.append(lines[i].strip()); i+=1
            story.append(Paragraph(inline(' '.join(parts)),styles['BodyKR']))
    def page(canvas,doc):
        canvas.saveState(); w,h=A4
        canvas.setStrokeColor(GRID); canvas.setLineWidth(.5); canvas.line(17*mm,13*mm,w-17*mm,13*mm)
        canvas.setFont('Nanum',7); canvas.setFillColor(colors.HexColor('#5C6B79'))
        canvas.drawString(17*mm,8.2*mm,f'{project} | Valuation vintage {cutoff}')
        canvas.drawRightString(w-17*mm,8.2*mm,f'{doc.page}')
        canvas.restoreState()
    doc.build(story,onFirstPage=page,onLaterPages=page)

import argparse
parser=argparse.ArgumentParser(description='Build the portfolio PDF from the Markdown report and methodology notes.')
parser.add_argument('--project',required=True,help='Company display name')
parser.add_argument('--vintage',required=True,help='Valuation cutoff date')
parser.add_argument('--output',required=True,help='PDF output path, relative to repository root')
args=parser.parse_args()
md_files=[ROOT/'report/FINAL_REPORT.md']
for p in [ROOT/'report/METHODOLOGY_APPENDIX.md']:
    if p.exists(): md_files.append(p)
out=ROOT/args.output
out.parent.mkdir(parents=True,exist_ok=True)
build_doc(out,md_files,args.project,args.vintage)
print(f'Generated {out}')
