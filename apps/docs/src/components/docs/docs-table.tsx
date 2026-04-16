import { For } from "solid-js";
import type { JSX } from "solid-js";
import type { CodeCell } from "./table-cell.ts";

type DocsTableCell = JSX.Element | string | number | boolean | null | undefined | CodeCell;

type DocsTableProps = {
  columns: string[];
  rows: Array<Array<DocsTableCell>>;
  class?: string;
};

function isCodeCell(cell: DocsTableCell): cell is CodeCell {
  return typeof cell === "object" && cell !== null && "code" in cell;
}

export function DocsTable(props: DocsTableProps) {
  const className = () =>
    props.class
      ? `my-6 overflow-x-auto rounded-3xl border border-border/70 bg-background ${props.class}`
      : "my-6 overflow-x-auto rounded-3xl border border-border/70 bg-background";

  return (
    <div class={className()}>
      <table class="min-w-full border-collapse text-sm">
        <thead class="bg-secondary/25">
          <tr>
            <For each={props.columns}>
              {(column) => (
                <th class="border-b border-border/70 px-4 py-3 text-left font-medium text-foreground">
                  {column}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={props.rows}>
            {(row) => (
              <tr class="transition-colors hover:bg-secondary/15">
                <For each={row}>
                  {(cell) => (
                    <td class="border-b border-border/70 px-4 py-3 align-top text-caption">
                      {isCodeCell(cell) ? (
                        <code class="rounded bg-secondary px-1 py-0.5 font-mono text-[0.85em] text-foreground">
                          {cell.value}
                        </code>
                      ) : (
                        cell
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
