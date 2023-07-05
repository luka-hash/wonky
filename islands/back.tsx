import { tw } from "https://esm.sh/twind@0.16.19";

export default function Back() {
  return (
    <button
      class={tw`border-l-2 border-black pl-2 focus:outline-none`}
      onClick={() => {
        window.history.back();
      }}
    >
      go back
    </button>
  );
}
