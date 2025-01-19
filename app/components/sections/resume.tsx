import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import {experienceData} from "@/constants/experience";
import Image from "next/image";

export default function Resume() {
    return (
        <section className="flex items-center justify-end">
            <VerticalTimeline
                layout={'1-column-right'}
                lineColor={'#f3f4f6'}
            >
                {experienceData.map((experience) => (
                    <VerticalTimelineElement
                        key={experience.company_name}
                        date={experience.date}
                        iconStyle={{ background: experience.iconBg }}
                        position={"left"}
                        icon={
                            <div className="flex justify-center items-center w-full h-full">
                                <Image
                                    src={experience.icon}
                                    alt={experience.company_name}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                        }
                        contentStyle={{
                            borderBottom: "8px",
                            borderStyle: "solid",
                            borderBottomColor: experience.iconBg,
                            boxShadow: "none",
                            backgroundColor: "#334155",
                        }}
                        visible={true}
                    >
                        <div>
                            <h3 className="text-gray-100 text-xl font-poppins font-semibold">
                                {experience.title}
                            </h3>
                            <p
                                className="text-black-500 font-medium text-base"
                                style={{ margin: 0 }}
                            >
                                {experience.company_name}
                            </p>
                        </div>

                        <ul className="my-5 list-disc ml-5 space-y-2">
                            {experience.points.map((point, index) => (
                                <li
                                    key={`experience-point-${index}`}
                                    className="text-black-500/50 font-normal pl-1 text-sm"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>

        </section>
    );
}