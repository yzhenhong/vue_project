import { UIEngine, Components, BasicHTMLLayout, BasicWXMLLayout, SizeTranslator, BasicTheme, DefaultNode, LayoutNode, ThemeNode } from '../../thirdparty/zephyr'
import { StringBuilder } from '../../thirdparty/zephyr/utils/string-utils'
import { resolveStyle, resolveClassList } from '../../thirdparty/zephyr/utils/node-utils'
const { Page, Row, Col, Card } = Components

// round image with title
const TAG_ROUND_IMAGE_WITH_TITLE = 'round-image-with-title'

class RoundImgWithTitle extends DefaultNode {
  constructor () {
    super()
    this.id = TAG_ROUND_IMAGE_WITH_TITLE + '-id'
    this.tag = TAG_ROUND_IMAGE_WITH_TITLE
    this.image = new Components.Image()
    this.image.addStyles({ borderRadius: '50%', width: '100px', height: '100px' })
    this.text = new Components.Text()
    this.text.addStyles({
      marginTop: '20px',
      fontSize: '28px',
      color: '#6e7888',
      letterSpacing: '0',
      textAlign: 'center'
    })
    this.append(this.image)
    this.append(this.text)
  }

  setSrc (src) {
    this.image.setSrc(src)
  }

  get src () {
    return this.image.attr('src')
  }

  setTitle (title) {
    this.text.setText(title)
  }

  get title () {
    return this.text.getText()
  }

  setTitleStyles (styles) {
    this.title.addStyles(styles)
  }
}

class RoundImgWithTitleHTMLLayout extends LayoutNode {
  constructor () {
    super()
    this.tag = TAG_ROUND_IMAGE_WITH_TITLE
  }

  render (node) {
    const sb = new StringBuilder()
    const style = resolveStyle(node)
    const classString = resolveClassList(node)
    sb.appendLine(`<div class="${classString}" style="${style}">`)
    node.children.forEach(child => {
      sb.appendLine(child.layoutNode.render(child))
    })
    sb.appendLine('</div>')
    return sb.str()
  }
}

class RoundImgWithTitleWXMLLayout extends RoundImgWithTitleHTMLLayout {
  render (node) {
    const sb = new StringBuilder()
    const style = resolveStyle(node)
    const classString = resolveClassList(node)
    sb.appendLine(`<view class="${classString}" style="${style}">`)
    node.children.forEach(child => {
      sb.appendLine(child.layoutNode.render(child))
    })
    sb.appendLine('</view>')
    return sb.str()
  }
}

class RoundImgWithTitleTheme extends ThemeNode {
  constructor () {
    super()
    this.tag = TAG_ROUND_IMAGE_WITH_TITLE
  }

  inject (node) {
    const kThemeClassList = ['ui-round-image-text']
    kThemeClassList.forEach(cls => node.addClass(cls))
    return node
  }
}

//  size translator
class H5SizeTranslator extends SizeTranslator {
  constructor () {
    super('px')
  }

  translate (size) {
    const scale = 260 / 375
    return size / 2 * scale
  }
}

class MpSizeTranslator extends SizeTranslator {
  constructor () {
    super('rpx')
  }

  translate (size) {
    return size
  }
}
// 分别给layout分配尺寸转换器
BasicHTMLLayout.specifySizeTranslator(new H5SizeTranslator())
BasicWXMLLayout.specifySizeTranslator(new MpSizeTranslator())

// 注册RoundImageWithTitle component
BasicTheme.registerThemeNode(new RoundImgWithTitleTheme())
BasicHTMLLayout.registerLayoutNode(new RoundImgWithTitleHTMLLayout())
BasicWXMLLayout.registerLayoutNode(new RoundImgWithTitleWXMLLayout())

const engine = new UIEngine()
engine.useTheme(BasicTheme)

/**
 * 通过应用组创建卡片
 * @param { name: string, list: Array<{icon: string, name: string, path: ''}> } apps
 */
export function createAppGroundCard (o) {
  const card = new Card()
  card.addStyles({
    backgrundColor: '#fff',
    padding: '30px 0',
    marginTop: '20px'
  })
  card.setTitle(o.name)
  const row = new Row().appendTo(card)
  row.addStyle('marginTop', '50px')

  o.apps.forEach(app => {
    const col = new Col().appendTo(row)
    col.setSpan(6)
    col.addStyles({
      cursor: 'pointer',
      textAlign: 'center'
    })
    const roundImgWithTitle = new RoundImgWithTitle()
    roundImgWithTitle.setTitle(app.name)
    roundImgWithTitle.setSrc(app.cover)
    col.append(roundImgWithTitle)
  })

  return card
}

export function render (pageChildren) {
  const ret = { html: '', wxml: '' }
  const page = new Page()
  page.addStyle('backgroundColor', '#f3f5f8')
  page.addStyle('--scale-factor', 0.693) // web页面的宽度只有 375 * 0.693 px
  pageChildren.forEach(child => page.append(child))
  engine.useLayout(BasicHTMLLayout)
  ret.html = engine.render(page)
  engine.useLayout(BasicWXMLLayout)
  // restore --scale-factor
  page.addStyle('--scale-factor', 1)
  ret.wxml = engine.render(page)
  console.log(ret.wxml)
  return ret
}
