import Link from "next/link";
import { Button } from "./ui/button";

export default function CallToAction({ title, description, button_label, button_link }: { title: string, description: string, button_label?: string, button_link?: string }) {
    return (
        <div className="border border-primary rounded-xl p-5 w-full md:w-lg my-20 space-y-5 font-bold">
            <p className="text-center uppercase text-primary">{title}</p>
            <p className="text-center">{description}</p>
            <div className="flex items-center justify-center gap-5">
                {button_label && button_link &&
                    <Button asChild variant={"cta"}>
                        <Link href={button_link} className="uppercase">
                            {button_label}
                        </Link>
                    </Button>
                }
                <Button className="uppercase">Contactez-nous</Button>
            </div>
        </div>
    );
}