import { MenuGroup, MenuItem } from '.';

const User = () => {
  return (
    <>
      <MenuItem href="/user/jobs" level="1">
        Jobs
      </MenuItem>
      <MenuItem href="/examples/todos" level="1">
        My todos
      </MenuItem>
      <MenuItem href="/user/my-jobs" level="1">
        My jobs
      </MenuItem>
      <MenuItem href="/examples/profile" level="1">
        Profile
      </MenuItem>
      <MenuItem href="/examples/multi-step" level="1">
        Multistep form
      </MenuItem>
      <MenuGroup label="Components">
        <MenuItem href="/examples/buttons" level="2">
          Buttons
        </MenuItem>
        <MenuItem href="/examples/datepicker" level="2">
          Datepicker
        </MenuItem>
        <MenuItem href="/examples/dropdown" level="2">
          Dropdown
        </MenuItem>
        <MenuItem href="/examples/async-dropdown" level="2">
          Async Dropdown
        </MenuItem>
        <MenuItem href="/examples/combobox" level="2">
          Combobox
        </MenuItem>
        <MenuItem href="/examples/async-combobox" level="2">
          Async Combobox
        </MenuItem>
        <MenuItem href="/examples/autocomplete" level="2">
          Autocomplete
        </MenuItem>
        <MenuItem href="/examples/modals" level="2">
          Modals
        </MenuItem>
        <MenuItem href="/examples/overflow" level="2">
          Overflow
        </MenuItem>
        <MenuItem href="/examples/pills" level="2">
          Pills
        </MenuItem>
        <MenuItem href="/examples/show-more" level="2">
          Show more
        </MenuItem>
        <MenuItem href="/examples/forms" level="2">
          Forms
        </MenuItem>
        <MenuItem href="/examples/formik" level="2">
          Formik forms
        </MenuItem>
      </MenuGroup>
      <MenuItem href="/login" level="1">
        Login page
      </MenuItem>
      <MenuItem href="/signup" level="1">
        Signup page
      </MenuItem>
      <MenuItem href="/404" level="1">
        404 Page
      </MenuItem>
    </>
  );
};
const Client = () => {
  return (
    <>
      <MenuItem href="/client/jobs" level="1">
        Jobs
      </MenuItem>
      <MenuItem href="/client/add-post" level="1">
        Make a post
      </MenuItem>
      <MenuItem href="/client/my-jobs" level="1">
        My jobs
      </MenuItem>
      <MenuItem href="/examples/profile" level="1">
        Profile
      </MenuItem>
      <MenuItem href="/examples/multi-step" level="1">
        Multistep form
      </MenuItem>
      <MenuGroup label="Components">
        <MenuItem href="/examples/buttons" level="2">
          Buttons
        </MenuItem>
        <MenuItem href="/examples/datepicker" level="2">
          Datepicker
        </MenuItem>
        <MenuItem href="/examples/dropdown" level="2">
          Dropdown
        </MenuItem>
        <MenuItem href="/examples/async-dropdown" level="2">
          Async Dropdown
        </MenuItem>
        <MenuItem href="/examples/combobox" level="2">
          Combobox
        </MenuItem>
        <MenuItem href="/examples/async-combobox" level="2">
          Async Combobox
        </MenuItem>
        <MenuItem href="/examples/autocomplete" level="2">
          Autocomplete
        </MenuItem>
        <MenuItem href="/examples/modals" level="2">
          Modals
        </MenuItem>
        <MenuItem href="/examples/overflow" level="2">
          Overflow
        </MenuItem>
        <MenuItem href="/examples/pills" level="2">
          Pills
        </MenuItem>
        <MenuItem href="/examples/show-more" level="2">
          Show more
        </MenuItem>
        <MenuItem href="/examples/forms" level="2">
          Forms
        </MenuItem>
        <MenuItem href="/examples/formik" level="2">
          Formik forms
        </MenuItem>
      </MenuGroup>
      <MenuItem href="/login" level="1">
        Login page
      </MenuItem>
      <MenuItem href="/signup" level="1">
        Signup page
      </MenuItem>
      <MenuItem href="/404" level="1">
        404 Page
      </MenuItem>
    </>
  );
};
export default { User, Client };
