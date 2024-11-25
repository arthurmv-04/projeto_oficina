import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";


import Link from "next/link";



export default function Footer() {
    return(

        <footer className="border-t-2 border-t-red-600 bg-zinc-900 flex justify-between text-stone-500 p-5">
            <p className="text-sm self-end">© 2024 JC Oficina Mecânica</p>
            <div className="flex flex-col gap-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55253.36552458269!2d-51.14978578046872!3d-30.05592067718948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95198346ddd6dbaf%3A0x9a5be4e77717ee01!2sJC%20Motorsports%20Oficina%20mec%C3%A2nica!5e0!3m2!1spt-BR!2sbr!4v1731622794732!5m2!1spt-BR!2sbr" width="400" height="300" style={{border : 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="flex gap-5 self-end">
                    <Link href="https://www.facebook.com/Jcoficinamec?locale=pt_BR" target="_blank">
                        <div className="border-2 border-stone-500 p-2 flex items-center rounded">
                            <TiSocialFacebook />
                        </div>
                    </Link>
                    <Link href="https://www.instagram.com/jc_oficinamec/" target="_blank" >
                        <div className="border-2 border-stone-500 p-2 flex items-center rounded">
                            <TiSocialInstagram />
                        </div>
                    </Link>
                </div>  
            </div>
         
        </footer>

    )
}