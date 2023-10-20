import { ArrowRightOnRectangleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import Input from '../../components/Input'

import { Link } from "react-router-dom";

import LogoLarge from '/logo-large.svg'

function Login(){
  return (
    <main className='w-screen h-screen relative flex flex-col items-center justify-center bg-bg-main text-white-200'>
      <Link to="/" className='absolute top-7 left-14 flex gap-2 cursor-pointer hover:text-[#c0c0c7]'>
        <ArrowUturnLeftIcon className='w-5 h-5' />
        <p>Voltar</p>
      </Link>
      
      <div className='mb-6'>
        <img src={LogoLarge} alt="" />
      </div>

      <div>
        <p className='text-xl font-medium'>Bem-vindo(a) de volta!</p>
        <p>Acesse o sistema de <span className='underline'>Empresa</span>:</p>
      </div>
      
      <div className='space-y-2 w-full flex flex-col items-center justify-center px-10'>
        <Input label="E-mail" type="email" placeholder="Insira seu e-mail" />
        <Input label="Senha" type="password" placeholder="Insira sua senha" />
      </div>

      <p className='w-96 pt-1 underline text-end text-sm font-medium text-green-main'>Esqueceu sua senha?</p>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-dark px-14 py-3 mt-4 text-sm font-medium text-white"
      >
        <ArrowRightOnRectangleIcon className='w-6 h-6' />
        ACESSAR
      </button>
    </main>
  )
}

export default Login