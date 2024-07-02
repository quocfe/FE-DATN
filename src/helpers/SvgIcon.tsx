import { ComponentProps } from 'react'
import useSvgIcon from '~/hooks/useSvgIcon'

type SvgIconProps = ComponentProps<'svg'> & {
  name: string
}
const SvgIcon = ({ name, ...props }: SvgIconProps) => {
  const { error, isLoading, Icon } = useSvgIcon(name.trim())

  const width = props.width ? +props.width : 10
  const height = props.height ? +props.height : 10

  if (error) {
    throw new Error(error.message)
  }

  if (isLoading) {
    return <svg width={width} height={height} fill='none' viewBox={`0 0 ${width} ${height}`} />
  }

  if (!Icon) {
    return <svg width={width} height={height} fill='none' viewBox={`0 0 ${width} ${height}`} />
  }

  return <Icon {...props} />
}

export default SvgIcon
