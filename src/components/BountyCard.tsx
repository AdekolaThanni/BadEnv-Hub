import React from "react";
import SubmitModal from "./SubmitModal";
import { useUser } from "@/contexts/UserProvider";

interface BountyCardProps {
  title: string;
  description: string;
  endDate: number;
  id: string;
  bountyPointsReward: number;
    badCharactersReward?: number;
    badNFTReward?: number;
    merchItemReward: number;
}

const BountyCard: React.FC<BountyCardProps> = ({
  title,
  description,
  endDate,
  id,
  bountyPointsReward,
  badCharactersReward,
  badNFTReward,
  merchItemReward,
}) => {
  const [open, setOpen] = React.useState(false);
  const {user} = useUser();

  const submission: {id: string, status: "pending" | "approved" | "declined"} = React.useMemo(() => user.submittedBounties?.find((sub: any) => sub.bounty.id === id), [user]);

  return (
    <>
      <SubmitModal
        open={open}
        setOpen={setOpen}
        id={id}
        onComplete={() => {}}
      />
      <div
        className={`w-full text-white p-4 rounded-[10px] shadow-[2px_2px_0px_#FFD60060] border-2 border-[#1D1D1D] bg-[#161616]`}
      >
        <h1 className="text-2xl uppercase font-bold">{title}</h1>
        <h2 className="text-lg text-[#DDDDDD] font-semibold">{description}</h2>
        <div className="flex items-start gap-2 flex-col justify-between w-full mt-5 mb-5 flew">
         {(badCharactersReward || badNFTReward || merchItemReward) && <div className="flex items-center gap-2">
            <div>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.9988 1.00015C10.9582 1.00015 9.27152 1.17987 7.97329 1.39865L7.82371 1.42433C6.69627 1.61298 5.75859 1.77037 5.0252 2.67231C4.55636 3.25166 4.40343 3.87788 4.36882 4.57555L3.81962 4.75862C3.30278 4.93052 2.84845 5.08233 2.49013 5.24977C2.10166 5.43061 1.74557 5.66279 1.4732 6.04121C1.20083 6.4185 1.09255 6.83041 1.04343 7.2557C0.998779 7.64975 0.998779 8.12639 0.998779 8.67225V8.8341C0.998779 9.28284 0.998779 9.67912 1.03227 10.0106C1.06799 10.369 1.14724 10.7184 1.34483 11.0555C1.54464 11.3937 1.81031 11.6326 2.10724 11.838C2.38073 12.0277 2.72678 12.2209 3.11971 12.4385L6.06668 14.0761C6.66948 15.2604 7.49664 16.3164 8.63413 17.0788C9.62427 17.7441 10.8131 18.1616 12.2207 18.2721C12.1816 18.3705 12.1615 18.4755 12.1616 18.5813V20.5348H10.5653C10.1137 20.5348 9.67599 20.6913 9.32675 20.9777C8.97751 21.264 8.73827 21.6625 8.64975 22.1054L8.40529 23.3255H6.3011C6.07906 23.3255 5.86611 23.4137 5.70911 23.5707C5.5521 23.7277 5.46389 23.9406 5.46389 24.1627C5.46389 24.3847 5.5521 24.5977 5.70911 24.7547C5.86611 24.9117 6.07906 24.9999 6.3011 24.9999H19.6964C19.9185 24.9999 20.1314 24.9117 20.2884 24.7547C20.4455 24.5977 20.5337 24.3847 20.5337 24.1627C20.5337 23.9406 20.4455 23.7277 20.2884 23.5707C20.1314 23.4137 19.9185 23.3255 19.6964 23.3255H17.5923L17.3478 22.1054C17.2593 21.6625 17.02 21.264 16.6708 20.9777C16.3216 20.6913 15.8839 20.5348 15.4323 20.5348H13.836V18.5813C13.836 18.4755 13.816 18.3705 13.7768 18.2721C15.1844 18.1605 16.3733 17.7441 17.3634 17.08C18.502 16.3164 19.3281 15.2604 19.9309 14.0761L22.8778 12.4385C23.2708 12.2209 23.6168 12.0277 23.8903 11.838C24.1861 11.6326 24.4529 11.3937 24.6516 11.0566C24.8503 10.7184 24.9307 10.369 24.9653 10.0106C24.9988 9.67912 24.9988 9.28284 24.9988 8.8341V8.67225C24.9988 8.12751 24.9988 7.64975 24.9541 7.2557C24.905 6.83041 24.7978 6.4185 24.5244 6.04121C24.252 5.66279 23.8959 5.43061 23.5085 5.24866C23.148 5.08122 22.6948 4.93052 22.1779 4.75862L21.6287 4.57555C21.5952 3.87677 21.4423 3.25166 20.9724 2.67231C20.2401 1.76925 19.3024 1.61186 18.175 1.42433L18.0243 1.39865C16.3631 1.12634 14.6821 0.993044 12.9988 1.00015ZM15.8844 23.3255L15.7058 22.4336C15.6931 22.3703 15.659 22.3134 15.6091 22.2725C15.5592 22.2316 15.4968 22.2092 15.4323 22.2092H10.5653C10.5008 22.2092 10.4383 22.2316 10.3885 22.2725C10.3386 22.3134 10.3044 22.3703 10.2918 22.4336L10.1132 23.3255H15.8844ZM4.39003 6.33367L4.40566 6.32809C4.48603 8.02481 4.67692 9.90014 5.15469 11.6527L3.96473 10.993C3.5305 10.7507 3.25813 10.5989 3.06166 10.4627C2.88083 10.3366 2.82166 10.2618 2.78929 10.206C2.7558 10.1502 2.72008 10.0631 2.69776 9.84433C2.67409 9.49584 2.6659 9.14648 2.6732 8.79727V8.71578C2.6732 8.11411 2.67431 7.73347 2.70669 7.44547C2.73794 7.1798 2.78706 7.08045 2.83171 7.02017C2.87524 6.95878 2.95338 6.88064 3.19562 6.76789C3.45906 6.64511 3.82073 6.52455 4.39003 6.33367ZM21.5919 6.32697C21.5126 8.02369 21.3206 9.89902 20.844 11.6516L22.0328 10.9918C22.4671 10.7496 22.7394 10.5978 22.9359 10.4616C23.1167 10.3355 23.1759 10.2607 23.2083 10.2049C23.2417 10.1491 23.2775 10.062 23.2998 9.84321C23.3232 9.60433 23.3244 9.29289 23.3244 8.79615V8.71466C23.3244 8.113 23.3232 7.73235 23.2909 7.44435C23.2596 7.17868 23.2105 7.07933 23.1658 7.01906C23.1223 6.95766 23.0442 6.87952 22.8019 6.76678C22.5385 6.64399 22.1768 6.52232 21.6075 6.33143L21.5919 6.32697ZM8.25236 3.04961C9.82133 2.79291 11.409 2.66746 12.9988 2.67455C14.9411 2.67455 16.534 2.84534 17.7452 3.04961C19.0925 3.27733 19.375 3.36217 19.673 3.7283C19.9655 4.08774 19.9934 4.42932 19.9331 5.94186C19.8326 8.46239 19.5 11.1838 18.4708 13.2534C17.9618 14.2737 17.2964 15.1086 16.4313 15.6891C15.5707 16.2662 14.46 16.6279 12.9988 16.6279C11.5376 16.6279 10.428 16.2662 9.56733 15.6891C8.7011 15.1086 8.0358 14.2737 7.52789 13.2523C6.49757 11.1838 6.16603 8.4635 6.06557 5.94074C6.00529 4.42932 6.03208 4.08774 6.32566 3.7283C6.62259 3.36217 6.90501 3.27733 8.25236 3.04961Z"
                  fill="#FFD600"
                  stroke="#FFD600"
                  stroke-width="0.518518"
                />
              </svg>
            </div>
            <div className="font-semibold">{badCharactersReward}</div>
          </div>}
          {bountyPointsReward && <div className="flex items-center gap-2">
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.1767L13.9583 7.00001L18.9062 3.1178L16.9271 12.8233H3.07292L1.09375 3.1178L6.04167 7.00001L10 1.1767Z"
                fill="#FFD600"
                stroke="#FFD600"
                stroke-width="1.82692"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            + {bountyPointsReward}
          </div>}
        </div>
        <div className="w-full flex items-center mt-12 justify-between">
          <div className="w-full flex-1">
            {submission ? (
              <>
                {submission.status === "approved" ? (
                  <>
                    <span className="inline-flex items-center px-2 py-1 font-bold text-xl text-[#3CFB69] gap-2 uppercase">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.99998 16.42L0.789978 10.21L3.61998 7.38L6.99998 10.77L16.88 0.880005L19.71 3.71L6.99998 16.42Z"
                          fill="#3CFB69"
                        />
                      </svg>
                      approved
                    </span>
                  </>
                ) : submission.status === "pending" ? (
                  <>
                    <span className="inline-flex items-center px-2 py-1 font-bold text-xl text-[#3CFB69] gap-2 uppercase">
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.99998 16.42L0.789978 10.21L3.61998 7.38L6.99998 10.77L16.88 0.880005L19.71 3.71L6.99998 16.42Z"
                          fill="#3CFB69"
                        />
                      </svg>
                      submitted
                    </span>
                  </>
                ) : submission.status === "declined" ? (
                  <>
                    <span className="inline-flex items-center px-2 py-1 font-bold text-xl text-red-500 gap-2 uppercase">
                      declined
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="inline-flex items-center uppercase gap-x-1.5  bg-[#EB212E] px-3 py-2 text-lg rounded-[3px] font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </>
            )}
          </div>
          <div className=" flex items-center gap-2">
            <div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.0003 13.9999C9.5916 13.9999 11.1177 13.3677 12.2429 12.2425C13.3682 11.1173 14.0003 9.59118 14.0003 7.99988C14.0003 6.40858 13.3682 4.88245 12.2429 3.75724C11.1177 2.63202 9.5916 1.99988 8.0003 1.99988C6.40901 1.99988 4.88288 2.63202 3.75766 3.75724C2.63245 4.88245 2.0003 6.40858 2.0003 7.99988C2.0003 9.59118 2.63245 11.1173 3.75766 12.2425C4.88288 13.3677 6.40901 13.9999 8.0003 13.9999ZM8.0003 0.499878C8.98522 0.499878 9.96049 0.693871 10.8704 1.07078C11.7804 1.44769 12.6072 2.00014 13.3036 2.69658C14 3.39302 14.5525 4.21981 14.9294 5.12975C15.3063 6.03969 15.5003 7.01496 15.5003 7.99988C15.5003 9.989 14.7101 11.8967 13.3036 13.3032C11.8971 14.7097 9.98943 15.4999 8.0003 15.4999C3.8528 15.4999 0.500305 12.1249 0.500305 7.99988C0.500305 6.01075 1.29048 4.1031 2.697 2.69658C4.10353 1.29005 6.01118 0.499878 8.0003 0.499878ZM8.3753 4.24988V8.18738L11.7503 10.1899L11.1878 11.1124L7.2503 8.74988V4.24988H8.3753Z"
                  fill="#DDDDDD"
                />
              </svg>
            </div>
            <div className="font-semibold">
              {new Date(endDate).toDateString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BountyCard;
