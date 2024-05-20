"use client"

import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from 'embla-carousel'
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";


const OPTIONS: EmblaOptionsType = { loop: true, }

export default function TechCarousel() {

    return (
        <Carousel plugins={[Autoplay()]} opts={OPTIONS} className="w-full max-w-3xl align-self-center mx-auto py-12">
            <CarouselContent className="-ml-1" >
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="border-none">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-2xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}