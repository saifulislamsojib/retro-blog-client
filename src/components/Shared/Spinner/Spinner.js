import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
    return (
        <div className="flex justify-center mt-8">
      <BeatLoader color='blue' loading={true} css={override} size={30} />
    </div>
    );
};

export default Spinner;