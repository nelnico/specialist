import { Card, CardContent } from "@/components/ui/card";
import { SpecialistListItem } from "@repo/types";

export default function SpecialistCard({
  specialist,
}: {
  specialist: SpecialistListItem &
    Partial<{ title: string; avatarUrl: string }>;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="font-medium leading-none">{specialist.name}</div>
        {/* `title` may not exist on SpecialistListItem; allow optional */}
        {(specialist as SpecialistListItem).name ? (
          <div className="mt-1 text-sm text-muted-foreground">
            {JSON.stringify(specialist, null, 2)}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
