import ScrollReveal from "../../shared/ScrollReveal/ScrollReveal";
import VariableProximity from "../../shared/VariableProximity/VariableProximity";

const CallToAction = ({ ctaContainerRef }) => (
  <section className="call-to-action" ref={ctaContainerRef}>
    <div className="call-to-action-container">
      <ScrollReveal
        baseOpacity={0.05}
        enableBlur={true}
        baseRotation={0}
        blurStrength={12}
        stagger={0.2}
        containerClassName="call-to-action-reveal"
        textClassName="call-to-action-text"
      >
        We craft high-performance, design-led cycling apparel for crews,
        companies, and weekend warriors who take pride in how they roll.
      </ScrollReveal>

      <div>
        <a href="/product" className="call-to-action-link">
          <VariableProximity
            label="Discover more about Decca"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={ctaContainerRef}
            radius={120}
            falloff="exponential"
          />
        </a>
      </div>
    </div>
  </section>
);
export default CallToAction;
