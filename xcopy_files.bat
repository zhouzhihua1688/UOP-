@echo off

echo %0
echo %1

set folder=%1

set svnbase="D:\at_work\EC\apps\WebFrontend\branch\demo_uop"
set gitbase="D:\at_work\git_projects\uop\uop"


xcopy %svnbase%\%folder% %gitbase%\%folder% /F /Y /G


rem pause