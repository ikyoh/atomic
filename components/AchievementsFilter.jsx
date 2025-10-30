'use client';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function AchievementsFilter({ secteurs, criteres }) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const searchRef = useRef("searchRef")

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            if (name === 'search') {
                if (value === '') {
                    params.delete(name);
                    return params.toString();
                }
                params.set(name, value);
                return params.toString();
            }
            if (name === 'secteur') {
                if (value === 'all') {
                    params.delete(name);
                    return params.toString();
                }
                params.set(name, value);
                return params.toString();
            }
            if (name === 'critere') {
                if (params.has(name, value)) {
                    params.delete(name, value);
                    return params.toString();
                }
                if (params.has(name)) {
                    params.append(name, value);
                    return params.toString();
                }
                params.set(name, value);
                return params.toString();
            }
        },
        [searchParams]
    );


    const resetQueryString = useCallback(() => {
        searchRef.current.value = '';
        setSecteur('all');
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        params.delete("critere");
        params.delete("secteur");
        router.replace(pathname + '?' + params.toString(), { scroll: false });
    }, [searchParams, router, pathname]);

    const [isActive, setIsActive] = useState(false)
    const [secteur, setSecteur] = useState('all')
    const params = new URLSearchParams(searchParams.toString());



    return (
        <div className={cn("flex fixed -top-80 md:top-32 z-30 w-full md:w-auto md:min-w-70 transition-all", isActive ? "translate-y-full md:translate-x-0 md:translate-y-0 md:right-0" : "md:translate-x-full md:right-12")}>
            <div
                className={cn("bg-tertiary flex-none w-7 h-14 -rotate-90 md:rotate-0 rounded-l-full absolute -bottom-9 left-1/2 md:-left-6 -z-10 md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 cursor-pointer flex items-center")}
                onClick={() => {
                    setIsActive(!isActive);
                }}
            >
                <Image
                    alt="icon"
                    src={"/icons/arrow.svg"}
                    height={14}
                    width={21}
                    className={cn("h-4! ml-1 transition-all", isActive ? "-rotate-180 md:rotate-180" : "md:rotate-0")}
                />
            </div>
            <div className="bg-light/50 p-0 pb-2 space-y-2 backdrop-blur-md overflow-hidden w-full rounded-bl-md rounded-br-md md:rounded-tl-md md:rounded-br-none">
                <div className="bg-secondary p-2 flex justify-between gap-2">
                    <div className="flex items-center bg-white rounded-full pl-3 flex-1">
                        <span
                            onClick={() => {
                                setIsActive(true),
                                    searchRef.current.focus();
                            }}
                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                        >
                            <SearchIcon />
                        </span>
                        <Input
                            ref={searchRef}
                            placeholder="Rechercher"
                            className="w-full border-0 h-8 text-black bg-transparent focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            onChange={(event) => {
                                router.replace(pathname + '?' + createQueryString('search', event.target.value), { scroll: false });
                            }}
                        />
                    </div>
                    <div
                        onClick={() => {
                            resetQueryString();
                        }}
                        className="flex items-center cursor-pointer bg-tertiary rounded-full size-8 p-2"
                    >
                        <ResetIcon />
                    </div>
                </div>
                <div className="px-2 space-y-2">
                    {criteres?.map(critere => (
                        <Label
                            key={"critere" + critere.id}
                            id={"critere" + critere.id}
                            className={cn("cursor-pointer hover:bg-light flex items-center gap-3 rounded-sm border-1 border-transparent px-2 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-light")}
                            onClick={() => {
                                router.replace(pathname + '?' + createQueryString('critere', critere.id), { scroll: false });
                            }}>
                            <Checkbox
                                id={`toggle-${critere.id}`}
                                className="hidden"
                                checked={params.has("critere", critere.id)}
                            />
                            <Image
                                alt={critere.name}
                                src={critere.acf.icon}
                                height={14}
                                width={14}
                                className="h-6 w-6 m-0! invert dark:invert-0"
                            />
                            <p className="text-sm! m-0!">
                                {critere.name}
                            </p>
                        </Label>
                    ))}

                    <Select
                        defaultValue={params.has("secteur") ? params.get("secteur") : "all"}
                        value={secteur}
                        onValueChange={(value) => {
                            router.replace(pathname + '?' + createQueryString('secteur', value), { scroll: false }),
                                setSecteur(value);
                        }}>
                        <SelectTrigger>
                            <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 whitespace-nowrap truncate w-50!">
                                <SelectValue placeholder="Secteur" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* <SelectLabel>Secteur</SelectLabel> */}
                                <SelectItem value="all">
                                    <div className="flex items-center gap-2 truncate">
                                        <Image
                                            alt="Tous les secteurs"
                                            src="/icons/arrow.svg"
                                            height={14}
                                            width={14}
                                            className="h-4 w-4 m-0! dark:invert"
                                        />
                                        Tous les secteurs
                                    </div>
                                </SelectItem>
                                {secteurs.map((secteur) => (
                                    <SelectItem key={'secteur' + secteur.id} value={secteur.id}>
                                        <div className="flex items-center gap-2">
                                            <Image
                                                alt={secteur.name}
                                                src={secteur.acf.icon}
                                                height={14}
                                                width={14}
                                                className="h-6 w-6 m-0! invert dark:invert-0"
                                            />
                                            {secteur.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div >
    );
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            viewBox="0 0 20 20"
            fill="none">
            <path d="M2.70872 19.728L6.60287 15.8332C6.77863 15.6574 6.87628 15.4191 6.87628 15.1691L6.87628 14.5323C8.25505 15.6105 9.98926 16.2512 11.8758 16.2512C16.3636 16.2512 20 12.6142 20 8.12559C20 3.63698 16.3636 -1.5895e-07 11.8758 -3.5512e-07C7.38795 -5.5129e-07 3.75159 3.63698 3.75159 8.12559C3.75159 10.0125 4.39215 11.747 5.47017 13.126L4.83351 13.126C4.58354 13.126 4.34528 13.2236 4.16952 13.3994L0.275363 17.2942C-0.0917881 17.6614 -0.0917881 18.2552 0.275363 18.6185L1.38072 19.7241C1.74787 20.0913 2.34157 20.0913 2.70872 19.728ZM6.87628 8.12559C6.87628 5.36367 9.11044 3.12523 11.8758 3.12523C14.6372 3.12523 16.8753 5.35977 16.8753 8.12559C16.8753 10.8875 14.6411 13.126 11.8758 13.126C9.11434 13.126 6.87628 10.8914 6.87628 8.12559Z" fill="#333333" />
        </svg>
    )
}

const ResetIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M19.9997 12.956C19.9997 13.7433 19.8952 14.4998 19.6862 15.2254C19.4772 15.9511 19.1846 16.6288 18.8085 17.2587C18.4323 17.8885 17.9795 18.467 17.4501 18.9941C16.9207 19.5212 16.3355 19.9662 15.6946 20.329C15.0537 20.6919 14.3606 20.9794 13.6152 21.1916C12.8699 21.4038 12.1001 21.5065 11.306 21.4997C10.5049 21.4997 9.73513 21.397 8.99672 21.1916C8.25831 20.9862 7.56867 20.6987 6.92779 20.329C6.28691 19.9594 5.69827 19.5144 5.16188 18.9941C4.62549 18.4738 4.17269 17.8988 3.80349 17.2689C3.43429 16.6391 3.14171 15.958 2.92576 15.2254C2.70981 14.4929 2.60532 13.7365 2.61229 12.956V12.2988H3.94978V12.956C3.94978 13.6201 4.03686 14.2602 4.21101 14.8763C4.38516 15.4924 4.63246 16.0675 4.9529 16.6015C5.27334 17.1354 5.65647 17.6215 6.1023 18.0596C6.54813 18.4978 7.04621 18.8777 7.59653 19.1995C8.14685 19.5212 8.73201 19.7643 9.35199 19.9286C9.97197 20.0929 10.6233 20.1784 11.306 20.1853C11.9817 20.1853 12.633 20.0997 13.26 19.9286C13.8869 19.7574 14.4721 19.5144 15.0154 19.1995C15.5588 18.8846 16.0534 18.508 16.4992 18.0699C16.945 17.6318 17.3317 17.1423 17.6591 16.6015C17.9865 16.0606 18.2338 15.4856 18.401 14.8763C18.5681 14.267 18.6552 13.6269 18.6622 12.956C18.6622 12.292 18.5751 11.6519 18.401 11.0358C18.2268 10.4197 17.9795 9.8446 17.6591 9.31062C17.3386 8.77665 16.9555 8.29059 16.5097 7.85245C16.0638 7.41432 15.5658 7.03437 15.0154 6.71262C14.4651 6.39086 13.88 6.14784 13.26 5.98353C12.64 5.81923 11.9887 5.73366 11.306 5.72681H2.54959L5.5903 8.71503L4.64987 9.63922L0 5.06961L4.64987 0.5L5.5903 1.42419L2.54959 4.41241H11.306C12.1071 4.41241 12.8768 4.5151 13.6152 4.72047C14.3537 4.92585 15.0433 5.21338 15.6842 5.58305C16.3251 5.95273 16.9137 6.39771 17.4501 6.91799C17.9865 7.43828 18.4393 8.01333 18.8085 8.64315C19.1777 9.27297 19.4703 9.95413 19.6862 10.6866C19.9021 11.4191 20.0066 12.1756 19.9997 12.956Z" fill="black" />
        </svg>
    )
}