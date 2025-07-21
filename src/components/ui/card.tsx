import React from "react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="container grid grid-rows-1 auto-rows-min items-start gap-1.5 px-6"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className="leading-none font-semibold" {...props} />;
}

function CardDescription({}: React.ComponentProps<"div">) {
  return <div className="text-muted-foreground text-sm" />;
}

function CardAction({}: React.ComponentProps<"div">) {
  return (
    <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end" />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className="px-6" {...props} />;
}

function CardFooter({}: React.ComponentProps<"div">) {
  return <div className="flex items-center px-6 [.border-t]:pt-6" />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
