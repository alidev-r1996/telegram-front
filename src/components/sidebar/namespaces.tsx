type NameSpacesProps = {
  namespaces: any[];
  activeNamespace: string;
  namespaceHandler: (string) => void;
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A list of namespaces that can be clicked to switch the active namespace.
 *

/*******  84558c6f-fdee-433e-94b2-b990bcc9c517  *******/
const NameSpacesList = ({ namespaces, activeNamespace, namespaceHandler }: NameSpacesProps) => {
  return (
    <ul className="flex items-center mt-4 text-sm overflow-auto gap-1">
      {namespaces?.map((item, index) => (
        <li
          key={index}
          onClick={() => namespaceHandler(item?.title)}
          className={`${
            activeNamespace == item?.title
              ? "bg-slate-800 font-bold text-purple-500"
              : "text-slate-500"
          } hover:text-slate-100  transition-all duration-300 capitalize  cursor-pointer px-3 py-1 rounded-full hover:bg-slate-800`}
        >
          {item?.title}
        </li>
      ))}
      
    </ul>
  );
};

export default NameSpacesList;
