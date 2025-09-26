'use client'
import React from "react"
import {useEffect} from "react";
import "./be-style.css";
import { usePathname } from "next/navigation";

export default function BeSearchForm({ locale, className }) {
    const pathname = usePathname();
    let isHome = ["/en", "/ru", "/az"].includes(pathname);
    let isBooking = ["/en/booking", "/ru/booking", "/az/booking"].includes(pathname);
    const searchForm = () => {
        !function(e,n){
            var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
            if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
                !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
                    a.onerror=a.onload=function(n,i){return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
                    ["az-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
        }(window, [
            ["setContext", "BE-INT-parknaftalan-az_2025-09-08", locale || "az"],
            ["embed", "search-form", {
                container: "be-search-form"
            }]
        ]);
    };

    useEffect(() => {
        if (locale) {
            searchForm();
        }
    }, [locale, isBooking]);

    if (isBooking) {
        return null;
    }

    return (
        <>
            <div id="block-search" className={`${className ?? ""} ${isHome ? "block-search block-search--home" : ""}`}>
                <div id="be-search-form" className="be-container">
                    <a href="https://exely.com/" rel="nofollow" target="_blank">Hotel management software</a>
                </div>
            </div>
        </>
    )
}