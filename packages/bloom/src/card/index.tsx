import { CardRoot } from "./card-root.tsx";
import { CardHeader } from "./card-header.tsx";
import { CardTitle } from "./card-title.tsx";
import { CardDescription } from "./card-description.tsx";
import { CardContent } from "./card-content.tsx";
import { CardFooter } from "./card-footer.tsx";

type CardType = typeof CardRoot & {
  Root: typeof CardRoot;
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

export const Card: CardType = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
