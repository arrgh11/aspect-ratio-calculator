import { Form, ActionPanel, Action, showToast, Clipboard } from "@raycast/api";

type Values = {
  width_1: number;
  width_2: number;
  height_1: number;
  height_2: number;
};

export default function Command() {
  function handleSubmit(values: Values) {
    console.log(values);

    //if width_2 is not empty
    if (values.width_2 && !values.height_2) {
        // calculate height_2 based on width_1 and height_1 aspect ratio
        values.height_2 = Math.round((values.width_2 * values.height_1) / values.width_1);
        console.log(values.height_2);
        Clipboard.copy(values.height_2);
        showToast({ title: "Calculated", message: "Height 2: " + values.height_2 });
    }

    if (values.height_2 && !values.width_2) {
        // calculate width_2 based on width_1 and height_1 aspect ratio
        values.width_2 = Math.round((values.height_2 * values.width_1) / values.height_1);
        console.log(values.width_2);
        Clipboard.copy(values.width_2);
        showToast({ title: "Calculated", message: "Width 2: " + values.width_2 });
    }

    // showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Calculate yourself some aspect ratio values." />
      <Form.TextField id="width_1" title="Width 1" placeholder="1920" />
      <Form.TextField id="height_1" title="Height 1" placeholder="1080" />
      <Form.Separator />
      <Form.TextField id="width_2" title="Width 2" placeholder="Enter value" />
      <Form.TextField id="height_2" title="Height 2" placeholder="Enter value" />
    </Form>
  );
}
