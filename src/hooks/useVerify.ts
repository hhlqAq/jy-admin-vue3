import { onMounted, reactive, toRefs } from 'vue'

export interface StateType {
  pool: string // 验证码字符池
  width: number // 验证码宽度
  height: number // 验证码高度
  imgCode: string // 验证码字符串
}

export function useVerify(verify: Ref<HTMLCanvasElement | null>) {
  const state = reactive<StateType>({
    pool: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
    width: 130,
    height: 46,
    imgCode: '',
  })
  const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const randomColor = (min: number, max: number) => {
    return `rgb(${randomNum(min, max)},${randomNum(min, max)},${randomNum(min, max)})`
  }
  const draw = () => {
    /**
     * 生成画布
     */
    const ctx = verify.value?.getContext('2d') as CanvasRenderingContext2D | null
    if (!ctx) {
      return ''
    }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, state.width, state.height)
    /**
     * 绘制验证码
     */
    let imgCode = ''
    for (let i = 0; i < 4; i++) {
      const text = state.pool[randomNum(0, state.pool.length - 1)] as string
      const fontSize = randomNum(18, 40)
      const deg = randomNum(-30, 30)
      /**
       * 定义字体
       * 对齐方式
       * 填充颜色
       * 保存当前状态
       * 平移
       * 旋转
       * 填充文字
       */

      ctx.font = `${fontSize}px Simhei`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillStyle = randomColor(80, 150)
      ctx.save()
      ctx.translate(30 * i + 15, 15)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(text, 5, 10)
      ctx.restore()
      imgCode += text
    }
    /**
     * 绘制干扰线
     */
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height))
      ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height))
      ctx.strokeStyle = randomColor(180, 230)
      ctx.closePath()
      ctx.stroke()
    }
    /**
     * 绘制干扰点
     */
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      ctx.arc(randomNum(0, state.width), randomNum(0, state.height), 1, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = randomColor(150, 200)
      ctx.fill()
    }

    return imgCode
  }
  // 初始展示
  onMounted(() => {
    draw()
    state.imgCode = draw()
  })
  const handleDraw = () => {
    draw()
    state.imgCode = draw()
  }
  return {
    ...toRefs(state),
    handleDraw,
    verify,
  }
}
