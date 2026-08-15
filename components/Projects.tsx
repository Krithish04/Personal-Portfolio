import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import AnimatedStat from "./AnimatedStat";
import TiltCard from "./TiltCard";
import MiniFlow from "./MiniFlow";

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-[1080px] mx-auto px-8">
        <SectionHead index="04" title="Projects" />

        <div className="grid grid-cols-1 gap-8">
          {/* TeleCRM */}
          <Reveal>
            <TiltCard className="border border-line rounded-xl bg-panel overflow-hidden transition-colors hover:border-teal/60 [transform-style:preserve-3d]">
              <div className="h-9 bg-panel2 border-b border-line flex items-center gap-2 px-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="font-mono text-[11px] text-dim ml-3 bg-void/40 px-2.5 py-0.5 rounded">
                  telecrm.internal/dashboard
                </span>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start gap-5 flex-wrap">
                  <div className="font-mono font-bold text-xl text-primary">
                    TeleCRM — Lead Management System
                  </div>
                  <div className="font-mono text-[11px] text-amber border border-amber/10 bg-amber/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    production
                  </div>
                </div>
                <p className="text-muted mt-3.5 text-[15px] max-w-[640px]">
                  A centralized CRM integrating mobile communication logs with
                  a MERN backend for real-time sales-interaction sync — plus
                  an automated engine that converts cold social engagement
                  into trackable sales opportunities via WhatsApp and social
                  webhooks.
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {["MongoDB", "Express.js", "Node.js", "WhatsApp Business API", "Webhooks"].map(
                    (t) => (
                      <span
                        key={t}
                        className="font-mono text-[11.5px] text-muted border border-line px-2.5 py-[5px] rounded-md"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-7 pt-6 border-t border-linesoft">
                  <div className="font-mono text-[10.5px] text-dim tracking-wide mb-3">
                    DATA FLOW
                  </div>
                  <MiniFlow nodes={["mobile logs", "MERN backend", "MongoDB", "WhatsApp API"]} />
                </div>

                <div className="flex gap-9 mt-7 pt-6 border-t border-linesoft flex-wrap">
                  <AnimatedStat target={40} suffix="%" label="less manual data entry" />
                  <AnimatedStat
                    target={99.9}
                    suffix="%"
                    decimals={1}
                    label="data integrity at peak traffic"
                  />
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Quotation Master */}
          <Reveal delay={0.1}>
            <TiltCard className="border border-line rounded-xl bg-panel overflow-hidden transition-colors hover:border-teal/60 [transform-style:preserve-3d]">
              <div className="h-9 bg-panel2 border-b border-line flex items-center gap-2 px-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="font-mono text-[11px] text-dim ml-3 bg-void/40 px-2.5 py-0.5 rounded">
                  quotationmaster.internal
                </span>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start gap-5 flex-wrap">
                  <div className="font-mono font-bold text-xl text-primary">
                    Quotation Master
                  </div>
                  <div className="font-mono text-[11px] text-amber border border-amber/10 bg-amber/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    internship
                  </div>
                </div>
                <p className="text-muted mt-3.5 text-[15px] max-w-[640px]">
                  An internal quoting platform built at Devisoft — reusable UI
                  components, full CRUD for quotations, and JWT-secured REST
                  APIs, deployed and validated on the company&apos;s local
                  testing server as part of an Agile team.
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {["Next.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth"].map(
                    (t) => (
                      <span
                        key={t}
                        className="font-mono text-[11.5px] text-muted border border-line px-2.5 py-[5px] rounded-md"
                      >
                        {t}
                      </span>
                    )
                  )}
                  <span className="font-mono text-[11.5px] text-dim border border-dashed border-line px-2.5 py-[5px] rounded-md">
                    Postman-tested
                  </span>
                </div>

                <div className="mt-7 pt-6 border-t border-linesoft">
                  <div className="font-mono text-[10.5px] text-dim tracking-wide mb-3">
                    DATA FLOW
                  </div>
                  <MiniFlow nodes={["client UI", "Express API", "Mongoose", "MongoDB"]} />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
