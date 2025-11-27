import Link from "next/link";
import { Button } from "./ui/button";

export default function CallToAction({ title, description, button_label, button_link }: { title: string, description: string, button_label?: string, button_link?: string }) {
    return (
        <div className="border border-primary rounded-xl p-10 my-20 space-y-10 font-bold">
            <p className="text-center uppercase text-primary px-10">{title}</p>
            <p className="text-center px-10">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                {button_label && button_link &&
                    <Button asChild variant={"cta"}>
                        <Link href={button_link} className="uppercase">
                            {button_label}
                        </Link>
                    </Button>
                }
                <Button asChild className="uppercase">
                    <Link href='contact' className="uppercase">
                        Contactez-nous
                    </Link>
                </Button>
            </div>
        </div>
    );
}