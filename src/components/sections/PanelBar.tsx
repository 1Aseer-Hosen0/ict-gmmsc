import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PanelBarProps {
  sessions: { id: string; label: string }[];
  activeSession: string;
  onSessionChange: (id: string) => void;
}

const PanelBar = ({ sessions, activeSession, onSessionChange }: PanelBarProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
                {/* Heading */}
                <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Committee Members
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals who lead our club and drive innovation in our community.
          </p>
        </motion.div>

        {/* Bar for dynamically change panel members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="flex flex-wrap gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button
                  variant={activeSession === session.id ? "default" : "ghost"}
                  onClick={() => onSessionChange(session.id)}
                  className={`
                    relative px-6 py-3 rounded-xl transition-all duration-300
                    ${activeSession === session.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <span className="relative z-10 font-medium">{session.label}</span>

                  {activeSession === session.id && (
                    <motion.div
                      layoutId="activePanel"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PanelBar;
