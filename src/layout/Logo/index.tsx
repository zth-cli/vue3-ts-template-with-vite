import smallLogo from './images/small_logo.png'
import { defineComponent } from 'vue'
import './style.scss'
export const Logo = defineComponent({
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => (
      <div class='zth-logo'>
        <img src={smallLogo} width={34} alt='logo' />
        {props.collapsed ? null : <span class='zth-logo-title'>{import.meta.env.VITE_APP_TITLE}</span>}
      </div>
    )
  },
})
