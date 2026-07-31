import {
  Clock,
  GraduationCap,
  Handshake,
  Heart,
  Home,
  ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react"

const MISSION = [
  { icon: Search, text: "Help people find rental homes more easily." },
  { icon: Handshake, text: "Help property owners reach more renters." },
  { icon: Wallet, text: "Reduce unnecessary intermediary fees." },
  { icon: ShieldCheck, text: "Make renting more transparent and trustworthy." },
  { icon: Heart, text: "Create a better rental experience for everyone." },
  {
    icon: GraduationCap,
    text: "Give students and young renters access to affordable housing.",
  },
]

const OFFER = [
  { icon: Search, text: "Search for homes that match your needs." },
  { icon: Home, text: "List your property in just a few steps." },
  { icon: MessageCircle, text: "Contact landlords or renters directly." },
  { icon: ImageIcon, text: "View clear property information and photos." },
  { icon: Clock, text: "Save time during the rental process." },
  {
    icon: LayoutDashboard,
    text: "Manage everything from a simple, personal dashboard.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-accent px-4 py-1.5 text-sm font-bold shadow-brutal-sm">
          <Sparkles className="size-4" />
          About Us
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Welcome to Rentsy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-muted-foreground text-balance">
          Rentsy is a platform that helps people find homes for rent and
          allows property owners to list their homes in a simple and easy
          way. We believe renting should be clear, fair, and affordable.
        </p>
      </div>

      <section className="mx-auto mt-14 max-w-3xl rounded-3xl border-2 border-foreground bg-card p-6 shadow-brutal sm:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight">Our Story</h2>
        <div className="mx-auto mt-4 max-w-xl space-y-4">
          <p className="leading-relaxed font-medium text-muted-foreground">
            Rentsy was created by Ay.... Ch...., a university student at
            Université Moulay Ismaïl Errachidia who experienced the problems
            of finding a place to rent.
          </p>
          <p className="leading-relaxed font-medium text-muted-foreground">
            While searching for housing, Ay.... Ch.... noticed that many
            rental intermediaries charged high fees without providing good
            service. This made renting more expensive and more difficult
            than it should be.
          </p>
          <p className="leading-relaxed font-medium text-muted-foreground">
            Instead of accepting these problems, Ay.... Ch.... decided to
            build a platform that would make renting easier for everyone.
          </p>
          <p className="font-extrabold">That idea became Rentsy.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Our Mission
        </h2>
        <p className="mx-auto mt-2 max-w-md font-medium text-muted-foreground">
          Our mission is simple:
        </p>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MISSION.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-brutal-sm"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <p className="font-bold">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight">
          What We Offer
        </h2>
        <p className="mx-auto mt-2 max-w-md font-medium text-muted-foreground">
          With Rentsy, you can:
        </p>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFER.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-6 text-center shadow-brutal-sm"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <p className="font-bold">{text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-md font-medium text-muted-foreground">
          We are always working to improve the platform and add new features
          that make renting even easier.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-3xl rounded-3xl border-2 border-foreground bg-secondary/60 p-6 shadow-brutal-sm sm:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Our Vision
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed font-medium text-muted-foreground">
          We want Rentsy to become a trusted place where landlords and
          renters can connect with confidence.
        </p>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed font-medium text-muted-foreground">
          Our goal is to build a community where people can find homes, list
          properties, and communicate easily without paying unnecessary fees
          or dealing with complicated processes.
        </p>
      </section>

      <section className="mx-auto mt-14 flex max-w-3xl flex-col items-center rounded-3xl border-2 border-foreground bg-primary px-6 py-14 shadow-brutal">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground">
          Thank you for being here
        </h2>
        <p className="mx-auto mt-3 max-w-md font-medium text-primary-foreground/80">
          Whether you are looking for a new home or want to rent out your
          property, we are here to help make the process simple, fair, and
          stress-free.
        </p>
        <div className="mt-6 rounded-xl border-2 border-foreground bg-background px-5 py-3 shadow-brutal-sm">
          <p className="text-lg font-extrabold">Rentsy</p>
          <p className="text-sm font-bold text-muted-foreground">
            Making home renting simple for everyone.
          </p>
        </div>
      </section>
    </div>
  )
}
