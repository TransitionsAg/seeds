export default function ErrorsDocs() {
  return (
    <div>
      <h1 class="typo-h1 mb-6">Errors</h1>
      <p class="typo-p mb-8">
        The <code>FormErrors</code> type and utilities for working with per-field validation errors.
      </p>

      <h2 class="typo-h3 mb-4">FormErrors</h2>
      <p class="typo-p mb-4">
        Errors are represented as <code>string[] | null</code> per field. Nested objects mirror the
        shape of your form values.
      </p>
      <pre class="bg-secondary p-4 rounded mb-8 text-sm overflow-x-auto">
        {`type FormErrors<T> = {
  [K in keyof T]: T[K] extends object ? FormErrors<T[K]> : string[] | null;
};`}
      </pre>

      <h2 class="typo-h3 mb-4">Utilities</h2>
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 pr-4 font-medium">Function</th>
            <th class="text-left py-2 pr-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>hasErrors(errors)</code>
            </td>
            <td class="py-2 pr-4">Returns true if any field has errors</td>
          </tr>
          <tr class="border-b border-border">
            <td class="py-2 pr-4">
              <code>initErrors(values)</code>
            </td>
            <td class="py-2 pr-4">Creates an empty errors object matching the shape of values</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
