import { FunctionComponent } from "react";
import { PORTOFOLIOS } from "@/constant/utils";

const PortfolioSection: FunctionComponent = () => (
  <>
    <section className="max-w-7xl mx-auto pb-52" id="portfolio">
      <div className="mx-auto mb-20 text-center">
        <h1 className="text-5xl font-bold">
          <span className="text-2xl font-normal">My</span> Portfolio
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:mx-auto justify-center grid-cols-1 lg:gap-10 md:gap-5 gap-5 px-4">
        {PORTOFOLIOS.map((portfolio, index) => (
          <div
            key={index}
            className="card card-compact mx-auto bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={portfolio.image}
                className="w-96"
                alt={portfolio.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{portfolio.title}</h2>
              <p className="lg:text-sm text-xs">{portfolio.description}</p>
              <div className="card-actions justify-start mt-3">
                {/* File */}
                <div className="flex">
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
                  <small className="px-2 my-auto">{portfolio.type}</small>
                </div>

                {/* Stack */}
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-code-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                  </svg>
                  <small className="px-2 my-auto">{portfolio.stack}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default PortfolioSection;
