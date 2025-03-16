<!-- Improved compatibility of back to top link: See: https://github.com/jerensl/playwright-ci/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">playwright-ci</h3>

  <p align="center">
    A monorepo for Playwright test reporting, logs, traces, and CI integration, with future GitHub Actions support.
    <br />
    <a href="https://github.com/jerensl/playwright-ci"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/jerensl/playwright-ci">View Demo</a>
    &middot;
    <a href="https://github.com/jerensl/playwright-ci/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/jerensl/playwright-ci/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Running Playwright tests in CI/CD can be challenging when it comes to reporting, logs, and debugging. This library aims to:   
✅ Streamline test reports for better visibility.   
✅ Seamlessly integrate with GitHub Actions.    
✅ Enhance debugging with structured logs.    

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section highlights the key frameworks and libraries used to build this project. Add-ons and plugins are mentioned in the acknowledgments section. Here are a few examples:


* [![Typescript][Typescript.org]][Typescript-url]
* [![Playwright][Playwright.dev]][Playwright-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up the reporter on your project and start using it.

### Prerequisites

The following are a requirement in order to use @playwright-ci.  
  - [NodeJS](https://nodejs.org/en) >= 18

### Installation

Install playwright-ci using your preferred package manager:   

npm   
  ```sh
   npm i -D @playwright-ci/reporter
   ```
pnpm   
  ```sh
   pnpm add i -D @playwright-ci/reporter
   ```
yarn   
  ```sh
  yarn add i -D @playwright-ci/reporter
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

After installing @playwright-ci/reporter, update your Playwright config to enable the reporter:

1. Update playwright.config.ts
  Add @playwright-ci/reporter to the reporters section in your Playwright configuration file:
  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    reporter: '@playwright-ci/reporter',
  });
  ```   
  Or, if you want costum configuration:
  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    reporter: [['@playwright-ci/reporter', {  
        logType: "singleline",
        failureThreshold: 1
      }
    ]],
  });
  ```
2. Run Playwright tests
  Execute your Playwright tests as usual:
  ```sh
  npx playwright test
  ```   
3. View Test Reports
  The reports will be generated in the specified output folder (playwright-report by default). You can upload and analyze them in CI/CD pipelines.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Setup changeset and release ci 
- [x] Publish @playwright-ci/reporter to NPM registry 
- [x] Add documentation on how to use @playwright-ci/reporter
- [ ] Plan the target for version 1.0.0 

See the [open issues](https://github.com/jerensl/playwright-ci/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/jerensl/playwright-ci/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jerensl/playwright-ci" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@jerensl22](https://twitter.com/jerensl22) - jerensslensun@gmail.com

Project Link: [https://github.com/jerensl/playwright-ci](https://github.com/jerensl/playwright-ci)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jerensl/playwright-ci.svg?style=for-the-badge
[contributors-url]: https://github.com/jerensl/playwright-ci/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jerensl/playwright-ci.svg?style=for-the-badge
[forks-url]: https://github.com/jerensl/playwright-ci/network/members
[stars-shield]: https://img.shields.io/github/stars/jerensl/playwright-ci.svg?style=for-the-badge
[stars-url]: https://github.com/jerensl/playwright-ci/stargazers
[issues-shield]: https://img.shields.io/github/issues/jerensl/playwright-ci.svg?style=for-the-badge
[issues-url]: https://github.com/jerensl/playwright-ci/issues
[license-shield]: https://img.shields.io/github/license/jerensl/playwright-ci.svg?style=for-the-badge
[license-url]: https://github.com/jerensl/playwright-ci/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jerensl
[product-screenshot]: images/screenshot.png
[Typescript.org]: https://img.shields.io/badge/Typescript-0769AD?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org 
[Playwright.dev]: https://img.shields.io/badge/Playwright-%23e10098?style=for-the-badge&logo=playwright&logoColor=white
[Playwright-url]: https://playwright.dev

