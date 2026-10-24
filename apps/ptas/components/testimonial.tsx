"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@repo/ui/components/carousel";
import Autoplay from "embla-carousel-autoplay";

export interface TestimonialItem {
	company: string;
	content: string;
	name: string;
}

export default function Testimonial({
	testimonials,
}: {
	testimonials: readonly TestimonialItem[];
}) {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 12000, // 12 seconds
				}),
			]}
		>
			<div className="relative px-8">
				<CarouselContent className="sm:-ml-6">
					{testimonials.map((testimonial) => (
						<CarouselItem className="sm:pl-6" key={testimonial.content}>
							<div className="flex flex-col gap-10">
								<div className="space-y-2">
									<p className="h-14 text-8xl">&ldquo;</p>
									<p className="whitespace-pre-line font-medium text-muted-foreground text-xl sm:text-2xl">
										{testimonial.content}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<div className="flex-1">
										{testimonial.name ? (
											<p className="font-medium text-lg">{testimonial.name}</p>
										) : null}
										{testimonial.company ? (
											<p className="text-muted-foreground">
												{testimonial.company}
											</p>
										) : null}
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious
					className="-left-4 z-10 size-9 -translate-y-1/2 disabled:bg-primary/10 disabled:text-primary disabled:opacity-100"
					variant="default"
				/>
				<CarouselNext
					className="-right-4 z-10 size-9 -translate-y-1/2 disabled:bg-primary/10 disabled:text-primary disabled:opacity-100"
					variant="default"
				/>
			</div>
		</Carousel>
	);
}
