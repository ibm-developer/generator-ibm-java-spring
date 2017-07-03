mkdir -p ../docs/scan
WORKING_DIR=`pwd`
echo "Current workingDir is $WORKING_DIR"
mkdir ./production
cd ./production
git clone git@github.ibm.com:arf/java-codegen-spring.git
cd ./java-codegen-spring/generator-spring
npm install --only=production
npm install @ibm/osc-cli -g
echo "Running scan"
osc-cli -s . -o -u travisci@travis.ibm.com
cd $WORKING_DIR
echo "Copying scan results file to ../docs"
cp ./production/java-codegen-spring/generator-spring/generator-spring_scanresults* ../docs/scan
