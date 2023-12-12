import { FC, MouseEvent, useState } from "react";
import { Masonry } from "@mui/lab";
import img1 from "../../assets/gallery-page/1.jpeg";
import img2 from "../../assets/gallery-page/2.jpeg";
import img3 from "../../assets/gallery-page/3.jpg";
import img4 from "../../assets/gallery-page/4.jpg";
import img5 from "../../assets/gallery-page/5.jpg";
import img6 from "../../assets/gallery-page/6.jpg";
import img7 from "../../assets/gallery-page/7.jpg";
import img8 from "../../assets/gallery-page/8.jpg";
import img9 from "../../assets/gallery-page/9.jpg";
import img10 from "../../assets/gallery-page/10.jpg";
import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import arrowSvg from "../../assets/gallery-page/arrow.svg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
];

const ImageItem: FC<{ src: string; onClick: () => void }> = ({
  src,
  onClick,
}) => {
  return <Box component="img" src={src} alt="Картинка" onClick={onClick} />;
};

const GalleryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const theme = useTheme();

  const handleModalOpen = (index: number) => {
    setImageIndex(index);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (
    evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (evt.target === evt.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleButtonPrev = () => {
    if (imageIndex - 1 < 0) return setImageIndex(images.length - 1);

    setImageIndex(imageIndex - 1);
  };

  const handleButtonNext = () => {
    if (imageIndex + 1 >= images.length) return setImageIndex(0);

    setImageIndex(imageIndex + 1);
  };

  const StyledButton = (props: { onClick: () => void; isLeft?: boolean }) => (
    <Button
      sx={{
        minWidth: "auto",
        marginLeft: props.isLeft ? { xs: 2, md: 10 } : undefined,
        marginRight: props.isLeft ? undefined : { xs: 2, md: 10 },
        height: { xs: 30, md: 60 },
        width: { xs: 30, md: 60 },
        padding: { xs: 2, md: 4 },
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
      }}
      variant="contained"
      onClick={props.onClick}
    >
      <Box
        sx={{
          width: { xs: 20, lg: 30 },
          transform: props.isLeft ? "rotate(180deg)" : undefined,
        }}
        component="img"
        src={arrowSvg}
        alt="Кнопка"
      />
    </Button>
  );

  return (
    <Container>
      <Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
        {images.map((image, index) => (
          <ImageItem
            key={index}
            src={image}
            onClick={() => handleModalOpen(index)}
          />
        ))}
      </Masonry>
      <Modal
        sx={{ backgroundColor: "rgba(0, 0, 0, .6)" }}
        open={isOpen}
        onClose={handleModalClose}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={handleOverlayClick}
        >
          <StyledButton isLeft={true} onClick={handleButtonPrev} />
          <Box sx={{ maxWidth: "70%", position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", top: -40, right: -40 }}
              onClick={handleModalClose}
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{ maxWidth: "100%" }}
              component="img"
              src={images[imageIndex]}
              alt="Картинка"
            />
          </Box>
          <StyledButton onClick={handleButtonNext} />
        </Box>
      </Modal>
    </Container>
  );
};

export default GalleryPage;
