import TextType from '@/components/ui/shadcn-io/TextType'


const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-black'>
        <TextType
            className='text-3xl font-poppins'
            text={["Loading . . ." , "Loading . . ."]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="."
            loop={true}
        />
    </div>
  )
}

export default Loading
