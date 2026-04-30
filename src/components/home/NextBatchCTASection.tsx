import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NextBatchCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-secondary to-accent text-secondary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur rounded-full text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            <span>Enrollment Open</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Next Digital Marketing Course Batch
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold">Starts: 1st November 2025</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Duration: 2 Months</span>
            </div>
          </div>

          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Limited seats available. Join now and get access to live projects, 
            AI tools training, and placement assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-background text-secondary hover:bg-background/90 shadow-lg"
              asChild
            >
              <Link to="/courses">
                Reserve Your Seat
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
              asChild
            >
              <Link to="/contact">Download Brochure</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
