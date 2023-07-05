import React from 'react'

type Props = {
    label:string;
}

const NavbarItem: React.FC<Props> = (props: Props) => {
    return (
        <div className='text-white cursor-pointer hover:text-gray-300 transition'>
            {props.label}
        </div>
    )
}

export default NavbarItem