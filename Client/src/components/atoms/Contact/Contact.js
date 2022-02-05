import "./Contact.scss";

// MUI component
import Avatar from "@mui/material/Avatar";
import StyledBadge from "../../../utils/StyledBadge";

const Contact = ({datacontact, clickcontact, contact, useronline}) => {
  return (
    <div className="wrapper-contact">
      {datacontact.map((item) => {
        const status = useronline.hasOwnProperty(item.id) ? "dot" : "";

        return (
          <div
            key={item.id}
            className={`contact ${
              contact?.id === item?.id && "contact active" && "clicked"
            }`}
            onClick={() => clickcontact(item)}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{vertical: "bottom", horizontal: "right"}}
              variant={status}
            >
              <Avatar alt={item?.name} src={item?.photo} />
            </StyledBadge>
            <div className="ml-m" style={{marginLeft: "10px"}}>
              <p className="contact-name">{item.name}</p>
              <p className="text-contact-chat">{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;