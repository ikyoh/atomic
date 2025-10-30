"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const FormDataSchema = z.object({
    'your-subject': z.string().min(2, {
        message: "Choix obligatoire",
    }),
    'your-name': z.string().min(2, {
        message: "Champ obligatoire",
    }),
    'your-company': z.string().optional(),
    'your-email': z.string().email({
        message: "Adresse email invalide",
    }),
    'your-phone': z.string(),
    'your-city': z.string().min(2, {
        message: "Champ obligatoire",
    }),
    'your-message': z.string().optional(),
    '_wpcf7_unit_tag': z.string().optional()
});

type Inputs = z.infer<typeof FormDataSchema>

export default function Contact() {

    const [mailStatus, setMailStatus] = useState("")

    const form = useForm<z.infer<typeof FormDataSchema>>({
        resolver: zodResolver(FormDataSchema),
        defaultValues: {
            'your-subject': "",
            'your-name': "",
            'your-email': "",
            'your-phone': "",
            'your-city': "",
            'your-company': "",
            'your-message': "",
            "_wpcf7_unit_tag": "wpcf7-f1040-p90-o1"
        },
    })

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     const res = await fetch('http://acfpro.local/wp-json/contact-form-7/v1/contact-forms/1040/feedback', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //     const data = await res.json();
    //     console.log(data); // Affiche la réponse (succès ou erreur)
    // };


    const onSubmit: SubmitHandler<Inputs> = async data => {

        setMailStatus("mail_sending")
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value);
            }
        });
        const res = await fetch('http://acfpro.local/wp-json/contact-form-7/v1/contact-forms/1040/feedback', {
            method: 'POST',
            body: formData,
        });
        const response = await res.json();
        if (response.data && response.data.status === 404) setMailStatus("mail_error")
        if (response.status === "mail_sent") setMailStatus("mail_sent")

    }

    return (
        <div className="bg-light rounded-xl shadow-xl p-5">
            <h2 className="text-center">Nous contacter</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="your-subject"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Sujet</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Quel est votre besoin?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup {...field}>
                                            <SelectLabel>Faites votre choix</SelectLabel>
                                            <SelectItem value="enseigne">J&apos;ai besoin d'une enseigne</SelectItem>
                                            <SelectItem value="signalétique">J&apos;ai besoin de signalétique</SelectItem>
                                            <SelectItem value="contact">J&apos;aimerais être recontacter</SelectItem>
                                            <SelectItem value="rdv">Je souhaite prendre un rendez-vous</SelectItem>
                                            <SelectItem value="other">Je ne sais pas trop</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <InputField
                        form={form}
                        name="your-name"
                        label="Votre nom"
                        placeholder="Nom"
                    />
                    <InputField
                        form={form}
                        name="your-company"
                        label="Votre société"
                        placeholder="Société"
                    />
                    <InputField
                        form={form}
                        name="your-city"
                        label="Votre Ville"
                        placeholder="Ville"
                    />
                    <InputField
                        form={form}
                        name="your-email"
                        label="Votre email"
                        placeholder="Email"
                    />
                    <InputField
                        form={form}
                        name="your-phone"
                        label="Votre téléphone"
                        placeholder="Téléphone"
                    />
                    <FormField
                        control={form.control}
                        name="your-message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Votre message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Parlez-nous de votre projet"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p>
                        Les données recueillies par ce formulaire ne seront pas stockées dans des bases de données et ne seront utilisées que dans le cadre d’une réponse à votre demande.
                    </p>
                    {mailStatus === "mail_error" &&
                        <p className="text-primary">
                            Votre message n'a pas été expédié - Il y a eu un problème - Veuillez essayer plus tard
                        </p>
                    }
                    <Button type="submit" disabled={mailStatus === "mail_sending" || mailStatus === "mail_sent"}>
                        {mailStatus === "mail_sent" ? "Message envoyé" : "Envoyer"}
                    </Button>
                </form>
            </Form>

        </div>
    )
}


const InputField = ({ form, name, placeholder, label }: any) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            {...form}
        />
    );
}
