import {
    getTaxonomy
} from "@/lib/wordpress";

import AchievementsFilter from "@/components/AchievementsFilter";
import AchievementsClient from "./achievementsClient";


export default async function Achievements() {

    const secteurs = await getTaxonomy("secteur")
    const criteres = await getTaxonomy("critere")
    console.log('secteurs', secteurs)
    console.log('criteres', criteres)

    return (
        <>
            <AchievementsFilter secteurs={secteurs} criteres={criteres} />
            <AchievementsClient />
        </>
    );
}
