import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import chalk from "chalk";

function updatePackageJson(projectPath, projectName) {
  const packageJsonPath = path.join(projectPath, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName; // Change the name field
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2)); // Write back formatted JSON
  } else {
    console.error("Error: package.json not found!");
  }
}

export function createNewProject(projectName, tempName) {
  const projectPath = path.join(process.cwd(), projectName);
  let template;

  if (fs.existsSync(projectPath)) {
    console.error("Project already exists!");
    process.exit(1);
  }

  if (tempName === "Compose") {
    template = "compose";
  } else if (tempName === "Manual") {
    template = "manual";
  }

  try {
    console.log(`📥 Creating project "${projectName}" using ${template} template...\n`);
    
    execSync(`git clone -n --depth=1 --filter=tree:0 https://github.com/aether-flux/rensa-templates.git`);
    process.chdir("rensa-templates");
    execSync(`git sparse-checkout set --no-cone ${template}`);
    execSync("git checkout");

    execSync(`mv ${template} ../${projectName}`);
    process.chdir("..");
    execSync("rm -rf rensa-templates");

    updatePackageJson(projectPath, projectName);

    // console.log(`\n🎉 Project "${projectName}" created successfully!\n`);
    // console.log(`\nRun the following commands to get started:-`);
    // console.log(`- ${chalk.yellow("npm install")}`);
    // console.log(`- ${chalk.yellow("npm run dev")}`);
  } catch (error) {
    console.error("Error creating project:", error);
    process.exit(1);
  }
}

