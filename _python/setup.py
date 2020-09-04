import setuptools
# access env variables
from decouple import config

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="text-processor_pkg-hawyar",
    version="0.0.1",
    author="hawyar",
    author_emaol="hawyarfa@gmail.com",
    long_description=long_description,
    long_description_content_type="text/markdown",
)
