import { getTranslations } from "@/lib/getTranslations";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const t = await getTranslations(locale);

    let title = "";
    if (locale === "az") {
        title = "Onlayn sifariş Park Naftalan Sanatoriyası, Naftalan - Rəsmi veb sayt";
    } else if (locale === "ru") {
        title = "Бронирование номеров онлайн в Санаторий Парк Нафталан, Нафталан - Официальный Сайт";
    } else {
        title = "Online reservation Park Naftalan Sanatorium, Naftalan - Official Site";
    }

    return {
        title,
    };
}

import BeBookingForm from "@/components/BeForms/be-booking-form";
import Head from 'next/head';

export default async function BookingPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations(locale);

    return (
        <>
            <div className="be-page">
                <h1 className="be-title">{t?.Booking}</h1>
                <BeBookingForm locale={locale} />
            </div>
        </>
    );
}
