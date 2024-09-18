import { FunctionComponent } from "react";
import { EXPERIENCES } from "@/constant/utils";

const ExperienceSection: FunctionComponent = () => (
  <>
    <section className="max-w-md mx-auto min-h-screen mb-24" id="experience">
      <div className="mx-auto mb-20 text-center">
        <h1 className="text-5xl font-bold">Experiences</h1>
      </div>
      <div className="justify-center bg-base-200 rounded-2xl mx-4">
        <ul className="menu menu-vertical w-full">
          {EXPERIENCES.map((experience, index) => (
            <li key={index}>
              <details open={index === 0}>
                <summary className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-folder-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
                  </svg>
                  <h1 className="text-lg">{experience.company}</h1>
                  {/* <span className="text-sm text-gray-500">
                    ({experience.date})
                  </span> */}
                </summary>
                <ul>
                  {experience.position.map((pos, posIndex) => (
                    <li key={posIndex}>
                      <a>
                        {pos.job}
                        <span className="text-sm text-gray-500">
                          ({pos.date})
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default ExperienceSection;
