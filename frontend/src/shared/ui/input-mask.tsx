import { useMask } from '@react-input/mask'

import { Input } from '@/shared/ui'

const InputMask: React.FC<React.ComponentProps<typeof Input> & { phoneMask: string }> = ({
	phoneMask,
	...props
}) => {
	const inputRef = useMask({
		mask: phoneMask,
		replacement: { x: /\d/ },
		showMask: true,
		separate: false
	})

	return <Input {...props} ref={inputRef} />
}
export default InputMask
