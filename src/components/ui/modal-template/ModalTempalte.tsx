import { FC } from 'react'
import {
    IconButton,
    Icon,
    Text,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent
  } from '@chakra-ui/react';

import { MdClose } from 'react-icons/md';

interface ModalTemplateProps {
    state: boolean,
    handler: ()=>void,
    icon: any,
    iColor?: string,
    title: string,
    width?: string,
    titleColor?: string,
    children: JSX.Element | Array<JSX.Element>
}

const ModalTemplate : FC<ModalTemplateProps> = ({state, handler, icon, title, width, titleColor, children, iColor}) => {
    return (
      <Modal
      isOpen={state}
      onClose={handler}
      size='xl'
      isCentered
      >
        <ModalOverlay />
        <ModalContent className='flex flex-col gap-4 w-full' maxH="80vh"  minW={ width ? width : '500px' } background='var(--block-bg)'>
          <div>
            <div className='flex gap-2.5 justify-between py-2 px-4 bg-[var(--section-color)]'>
              <div className='flex gap-2 items-center'>
                <Icon
                  as={icon}
                  color={ iColor ? iColor : 'var(--main-color)' }
                  fontSize='16px'
                />
                <Text fontSize='md' as='b' color={ titleColor ? titleColor : '#000' }>
                  { title }
                </Text>
              </div>

              <div>
                <IconButton
                  isRound={true}
                  variant='ghost'
                  aria-label='Close modal'
                  size='sm'
                  fontSize='18px'
                  icon={<Icon as={MdClose} color='var(--red-color)' />}
                  onClick={handler}
                  colorScheme='whiteAlpha'
                />
              </div>
            </div>
  
            <Divider borderColor='#999'/>
          </div>
  
          <div className='px-3 pb-4 text-sm flex flex-col gap-3'>
            { children }
          </div>
        </ModalContent>
      </Modal>
    );
}

export default ModalTemplate