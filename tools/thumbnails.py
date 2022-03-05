import os

root_dir = "../public"

def single_command(root_dir):
    file_list = ""
    for file in os.listdir(root_dir):
        if file.endswith(".svg"):
            file_list += " " +file

    command = "inkscape --export-type=png -w 300"+file_list
    os.chdir(root_dir)
    os.system(command)

def command_per_file(root_dir):
    os.chdir(root_dir)
    for file in os.listdir(root_dir):
        if file.endswith(".svg"):
            export_filename=file.replace(".svg",".thumb.png")
            command = f'inkscape --export-filename={export_filename} -w 300 "{file}"'
            os.system(command)

command_per_file(root_dir)
