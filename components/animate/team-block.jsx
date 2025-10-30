'use client'
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const TeamBlock = ({ children }) => {

    const ref = useRef()

    useGSAP(
        () => {
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top bottom-=140px',
                    onEnter: self => {
                        self.trigger.setAttribute('data-active', '')
                    },
                    onLeave: self => {
                        self.trigger.removeAttribute('data-active')
                    },
                    onEnterBack: self => {
                        self.trigger.setAttribute('data-active', '')
                    },
                    onLeaveBack: self => {
                        self.trigger.removeAttribute('data-active')
                    },
                    markers: false
                }
            })
        }
    )

    return (
        <div className="flex -space-x-36 pb-3 data-active:space-x-3 overflow-x-auto [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:opacity-0 hover:[&::-webkit-scrollbar-thumb]:opacity-100"
            ref={ref}
        >
            {children}
        </div>
    )
}

export default TeamBlock