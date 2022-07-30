@echo off

echo %0
echo %1

set folder=%1

set svnbase="D:\at_work\EC\apps\WebFrontend\branch\demo_uop"
set gitbase="D:\at_work\git_projects\uop\uop"


xcopy %svnbase%\public\js\%folder% %gitbase%\public\js\%folder% /I /E /Y /F
xcopy %svnbase%\views\%folder% %gitbase%\views\%folder% /I /E /Y /F
xcopy %svnbase%\routes\%folder% %gitbase%\routes\%folder% /I /E /Y /F

rem pause