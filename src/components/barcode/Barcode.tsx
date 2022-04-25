import React, { useEffect, useMemo, useState } from "react";
import Template from "components/root/Template";
import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Heading,
  Input,
  Tag,
  Image,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

function Barcode() {
  const [isSupported, setIsSupported] = useState(true);
  const [supportedFormats, setSupportedFormats] = useState<Array<string>>([]);

  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState<string>("");

  const [result, setResult] = React.useState<Array<any>>([]);

  const reader = useMemo(() => new FileReader(), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value || !event.target.files) return;
    const file = event.target.files[0];
    setImage(event.target.value);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!("BarcodeDetector" in window)) {
      setIsSupported(false);
      return;
    }

    window.BarcodeDetector.getSupportedFormats().then((formats: string[]) => {
      setSupportedFormats(formats);
    });
  }, []);

  useEffect(() => {
    const eventHandler = () => setPreview(reader.result as string);
    reader.addEventListener("loadend", eventHandler, false);
    return () => reader.removeEventListener("loadend", eventHandler);
  }, [reader]);

  useEffect(() => {
    if (supportedFormats.length === 0 || !preview) return;
    const imageEl = window.document.getElementById(
      "Image__Preview"
    ) as HTMLImageElement | null;

    if (imageEl === null) return;

    const barCodeDetector = new window.BarcodeDetector({
      formats: supportedFormats,
    });
    barCodeDetector
      .detect(imageEl)
      .then((barcodes: any[]) => setResult(barcodes))
      .catch((e: any) => {
        setResult([]);
        console.log("Error", e);
      });
  }, [preview, supportedFormats]);

  return (
    <Template>
      <>
        <Heading textAlign="center">Barcode Detection</Heading>
        <Divider borderColor="black" margin="25px 0" />
        {!isSupported && (
          <Alert status="error">
            <AlertIcon />
            Barcode Detection API is not supported in your current browser
          </Alert>
        )}
        {supportedFormats.length > 0 && (
          <>
            <Box textAlign="center">
              <Heading as="h3">Supported Formats</Heading>
              {supportedFormats.map((f: string) => (
                <Tag key={f} variant="solid" margin={2}>
                  {f}
                </Tag>
              ))}
            </Box>
            <Divider borderColor="black" margin="25px 0" />
          </>
        )}
        {isSupported && (
          <Box textAlign="center">
            <Heading as="h3">Upload Image with Barcode</Heading>
            <Input
              value={image}
              onChange={handleChange}
              placeholder="Upload Image with barcode"
              size="sm"
              type="file"
              accept="image/*"
            />
            {preview && (
              <>
                <Divider borderColor="black" margin="25px 0" />
                <Box textAlign="center">
                  <Heading as="h3">Image Preview</Heading>
                  <Image
                    id="Image__Preview"
                    src={preview}
                    maxWidth="250px"
                    margin="0 auto"
                  />
                </Box>
              </>
            )}
            {preview && result.length === 0 && (
              <>
                <Divider borderColor="black" margin="25px 0" />
                <Alert status="error">
                  <AlertIcon />
                  No Barcode Detected in Uploaded Image
                </Alert>
              </>
            )}
            {result.length > 0 && (
              <>
                <Divider borderColor="black" margin="25px 0" />
                <Box textAlign="center">
                  <Heading as="h3">Detected Barcode</Heading>
                </Box>
                {result.map((res, k) => (
                  <Box textAlign="center" key={`${image}-${k}`}>
                    <Stat>
                      {res.format && <StatLabel>{res.format}</StatLabel>}
                      {res.rawValue && <StatNumber>{res.rawValue}</StatNumber>}
                    </Stat>
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}
      </>
    </Template>
  );
}

export default Barcode;
