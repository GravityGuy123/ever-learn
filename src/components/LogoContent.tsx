import Image from "next/image";

export default function LogoContent() {

    return (
        <section className="flex items-center gap-2">
            <Image src="/logo.svg" alt="EverLearn Logo" width={32} height={32} />
            <span className="text-xl font-bold">EverLearn</span>
        </section>
    )
}