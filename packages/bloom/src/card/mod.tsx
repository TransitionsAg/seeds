import { CardRoot } from "./card-root.tsx";
import { CardHeader } from "./card-header.tsx";
import { CardTitle } from "./card-title.tsx";
import { CardDescription } from "./card-description.tsx";
import { CardContent } from "./card-content.tsx";
import { CardFooter } from "./card-footer.tsx";

export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
