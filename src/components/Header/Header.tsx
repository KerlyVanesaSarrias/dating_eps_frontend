import { Link } from 'react-router-dom';
import image from '../../assets/images/logo.png';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
export const Header = () => {
    return (
        <div className="w-full">
            <div className="flex w-full">
                <div className="h-30 w-1/2 flex items-center pl-8 justify-between relative">
                    <img className="w-32 " src={image} alt="image" />
                    <div className=" flex  text-gray-700 font-semibold gap-5 px-5 ">
                        <button>PERSONAS</button>
                        <button>EMPRESAS</button>
                        <button>IPS</button>
                        <MagnifyingGlassIcon className="w-7 text-gray-500 top-3  right-5 absolute" />
                    </div>
                </div>
                <div className="bg-gray-200 w-1/2 text-gray-600 text-xs font-bold">
                    <div className="flex items-center gap-10 p-5">
                        <button>Promoción y prevención</button>
                        <button>Somos nueva EPS</button>
                    </div>
                    <div>
                        <button className="p-5">Canales de servicio</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-10 w-full h-9 bg-[#16254c] px-2 items-center text-white">
                <button className="hover:bg-white hover:text-[#16254c] hover:rounded-xl px-4 ">
                    BLOG
                </button>
                <button className="hover:bg-white hover:text-[#16254c] hover:rounded-xl px-4 ">
                    Contributivo
                </button>
                <button className="hover:bg-white hover:text-[#16254c] hover:rounded-xl px-4 ">
                    Subsidiado
                </button>
                <button className="hover:bg-white hover:text-[#16254c] hover:rounded-xl px-4 ">
                    PAC
                </button>
                <Link to="/">
                    <button className=" bg-blue-500 text-black px-5 rounded-xl">
                        Ingresar
                    </button>
                </Link>
                <Link to="/dating">
                    <button className=" bg-blue-500 text-black px-5 rounded-xl">
                        Solicitar Cita
                    </button>
                </Link>
                <Link to="/dating-confirmed">
                    <button className=" bg-blue-500 text-black px-5 rounded-xl">
                        Citas confirmadas
                    </button>
                </Link>
            </div>
        </div>
    );
};
